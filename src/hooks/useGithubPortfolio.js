import { useEffect, useMemo, useState } from 'react';
import { getGithubProfile, getGithubRepositories } from '../services/githubApi';

export function useGithubPortfolio(username) {
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!username) return undefined;

    const controller = new AbortController();

    async function loadGithubData() {
      try {
        setStatus('loading');
        setError('');

        const [githubProfile, githubRepositories] = await Promise.all([
          getGithubProfile(username, controller.signal),
          getGithubRepositories(username, controller.signal),
        ]);

        setProfile(githubProfile);
        setRepositories(githubRepositories);
        setStatus('success');
      } catch (requestError) {
        if (requestError.name === 'AbortError') return;

        setError(
          requestError?.message ||
            'No se pudieron cargar los proyectos desde GitHub.'
        );
        setStatus('error');
      }
    }

    loadGithubData();

    return () => controller.abort();
  }, [username]);

  const stats = useMemo(() => {
    const languages = repositories.reduce((acc, repo) => {
      if (!repo.language) return acc;
      acc[repo.language] = (acc[repo.language] || 0) + 1;
      return acc;
    }, {});

    return {
      totalRepos: repositories.length,
      activeRepos: repositories.filter((repo) => !repo.isArchived).length,
      publicRepos: profile?.publicRepos || repositories.length,
      languages: Object.entries(languages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 6)
        .map(([name, count]) => ({ name, count })),
    };
  }, [profile, repositories]);

  return {
    profile,
    repositories,
    stats,
    status,
    error,
    isLoading: status === 'loading',
    isError: status === 'error',
  };
}
