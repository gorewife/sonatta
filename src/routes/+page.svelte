<script lang="ts">
  import { lastfm } from '$lib/lastfm';
  import type { LastFmUser, ComparisonData } from '$lib/types';
  import UserCard from '$lib/components/UserCard.svelte';
  import ComparisonView from '$lib/components/ComparisonView.svelte';
  import MockNotice from '$lib/components/MockNotice.svelte';

  let username1 = $state("");
  let username2 = $state("");
  let user1Data = $state<LastFmUser | null>(null);
  let user2Data = $state<LastFmUser | null>(null);
  let comparisonData = $state<ComparisonData | null>(null);
  let loading = $state(false);
  let error = $state("");

  async function loadUserData(username: string, userNumber: 1 | 2) {
    try {
      error = "";
      const userData = await lastfm.getUserInfo(username);
      if (userNumber === 1) {
        user1Data = userData;
      } else {
        user2Data = userData;
      }
    } catch (e) {
      error = `Failed to load user: ${username}`;
      console.error(e);
    }
  }

  async function compareUsers(event: Event) {
    event.preventDefault();
    if (!username1 || !username2) {
      error = "Please enter both usernames";
      return;
    }

    loading = true;
    error = "";
    comparisonData = null;

    try {
      const [userData1, userData2, comparison] = await Promise.all([
        lastfm.getUserInfo(username1),
        lastfm.getUserInfo(username2),
        lastfm.compareUsers(username1, username2)
      ]);
      
      user1Data = userData1;
      user2Data = userData2;
      comparisonData = comparison;
    } catch (e) {
      error = "Failed to compare users. Please check the usernames and try again.";
      console.error(e);
    } finally {
      loading = false;
    }
  }
</script>

<main class="container">
  <h1>Sonatta</h1>
  <p class="subtitle">Compare Last.fm Scrobbles</p>

  <MockNotice />

  <form class="input-form" onsubmit={compareUsers}>
    <div class="input-row">
      <div class="input-group">
        <label for="user1">User 1</label>
        <input 
          id="user1"
          type="text"
          placeholder="Last.fm username" 
          bind:value={username1}
          onblur={() => username1 && loadUserData(username1, 1)}
        />
      </div>
      <span class="vs">vs</span>
      <div class="input-group">
        <label for="user2">User 2</label>
        <input 
          id="user2"
          type="text"
          placeholder="Last.fm username" 
          bind:value={username2}
          onblur={() => username2 && loadUserData(username2, 2)}
        />
      </div>
    </div>
    <button type="submit" disabled={loading || !username1 || !username2}>
      {loading ? 'Comparing...' : 'Compare Scrobbles'}
    </button>
  </form>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <div class="user-cards">
    <UserCard user={user1Data} loading={loading} />
    <UserCard user={user2Data} loading={loading} />
  </div>

  <ComparisonView 
    comparison={comparisonData} 
    user1Name={username1} 
    user2Name={username2} 
  />
</main>

<style>
  :global(body) {
    margin: 0;
    background: #fff;
    color: #000;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2rem;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 900;
    margin: 0 0 0.25rem;
    letter-spacing: -0.03em;
  }

  .subtitle {
    color: #666;
    margin: 0 0 3rem;
    font-size: 1.125rem;
  }

  .input-form {
    border: 2px solid #000;
    padding: 2rem;
    margin-bottom: 3rem;
  }

  .input-row {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    align-items: flex-end;
  }

  .input-group {
    flex: 1;
  }

  label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #000;
    background: #fff;
    font-size: 1rem;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    background: #f5f5f5;
  }

  .vs {
    font-weight: 900;
    font-size: 1.5rem;
    padding-bottom: 0.75rem;
  }

  button {
    width: 100%;
    padding: 1rem;
    border: 2px solid #000;
    background: #000;
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  button:hover:not(:disabled) {
    background: #fff;
    color: #000;
  }

  button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .error {
    border: 2px solid #000;
    padding: 1rem;
    margin-bottom: 1rem;
    text-align: center;
    font-weight: 600;
  }

  .user-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }
</style>
