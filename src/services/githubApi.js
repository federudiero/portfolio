const GITHUB_API_BASE_URL = 'https://api.github.com';
const CACHE_PREFIX = 'portfolio.github';
const CACHE_TTL_MS = 10 * 60 * 1000;

function getCacheKey(username, resource) {
  return `${CACHE_PREFIX}.${username}.${resource}`;
}

function readCache(key) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed?.createdAt || Date.now() - parsed.createdAt > CACHE_TTL_MS) {
      window.localStorage.removeItem(key);
      return null;
    }

    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(key, data) {
  try {
    window.localStorage.setItem(
      key,
      JSON.stringify({ createdAt: Date.now(), data })
    );
  } catch {
    // Si el navegador bloquea localStorage, la app debe seguir funcionando.
  }
}

function parseNextPage(linkHeader) {
  if (!linkHeader) return null;

  const nextLink = linkHeader
    .split(',')
    .map((item) => item.trim())
    .find((item) => item.endsWith('rel="next"'));

  if (!nextLink) return null;

  const match = nextLink.match(/<([^>]+)>/);
  return match?.[1] || null;
}

async function requestJson(url, signal) {
  const response = await fetch(url, {
    signal,
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (!response.ok) {
    const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
    const rateLimitReset = response.headers.get('X-RateLimit-Reset');
    const resetDate = rateLimitReset
      ? new Date(Number(rateLimitReset) * 1000).toLocaleString('es-AR')
      : null;

    const error = new Error(
      response.status === 403 && rateLimitRemaining === '0'
        ? `GitHub limitó temporalmente las consultas. Reintentá después de ${resetDate || 'unos minutos'}.`
        : `GitHub respondió con estado ${response.status}.`
    );
    error.status = response.status;
    throw error;
  }

  return {
    data: await response.json(),
    nextPageUrl: parseNextPage(response.headers.get('Link')),
  };
}

export async function getGithubProfile(username, signal) {
  const cacheKey = getCacheKey(username, 'profile');
  const cachedProfile = readCache(cacheKey);
  if (cachedProfile) return cachedProfile;

  const { data } = await requestJson(`${GITHUB_API_BASE_URL}/users/${username}`, signal);
  const profile = {
    avatarUrl: data.avatar_url,
    bio: data.bio,
    publicRepos: data.public_repos,
    followers: data.followers,
    htmlUrl: data.html_url,
    name: data.name,
    login: data.login,
  };

  writeCache(cacheKey, profile);
  return profile;
}

export async function getGithubRepositories(username, signal) {
  const cacheKey = getCacheKey(username, 'repositories');
  const cachedRepositories = readCache(cacheKey);
  if (cachedRepositories) return cachedRepositories;

  let nextPageUrl = `${GITHUB_API_BASE_URL}/users/${username}/repos?per_page=100&sort=updated&type=all`;
  const repositories = [];

  while (nextPageUrl) {
    const response = await requestJson(nextPageUrl, signal);
    repositories.push(...response.data);
    nextPageUrl = response.nextPageUrl;
  }

  const normalizedRepositories = repositories
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      htmlUrl: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      topics: Array.isArray(repo.topics) ? repo.topics : [],
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      isFork: repo.fork,
      isArchived: repo.archived,
      visibility: repo.visibility,
      updatedAt: repo.updated_at,
      pushedAt: repo.pushed_at,
      languagesUrl: repo.languages_url,
    }))
    .sort((a, b) => {
      if (a.isArchived !== b.isArchived) return a.isArchived ? 1 : -1;
      if (a.isFork !== b.isFork) return a.isFork ? 1 : -1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  writeCache(cacheKey, normalizedRepositories);
  return normalizedRepositories;
}

export async function getRepositoryLanguages(repositoryFullName, signal) {
  if (!repositoryFullName) return [];

  const cacheKey = `${CACHE_PREFIX}.languages.${repositoryFullName}`;
  const cachedLanguages = readCache(cacheKey);
  if (cachedLanguages) return cachedLanguages;

  const { data } = await requestJson(
    `${GITHUB_API_BASE_URL}/repos/${repositoryFullName}/languages`,
    signal
  );

  const totalBytes = Object.values(data || {}).reduce((sum, value) => sum + Number(value || 0), 0);

  const languages = Object.entries(data || {})
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: totalBytes > 0 ? Math.round((Number(bytes) / totalBytes) * 100) : 0,
    }))
    .filter((item) => item.percentage > 0)
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 5);

  writeCache(cacheKey, languages);
  return languages;
}

