<script lang="ts">
  import type { LastFmUser } from '../types';

  interface Props {
    user: LastFmUser | null;
    loading?: boolean;
  }

  let { user, loading = false }: Props = $props();
</script>

<div class="user-card">
  {#if loading}
    <div class="loading">Loading user data...</div>
  {:else if user}
    <div class="user-info">
      <h3>{user.name}</h3>
      <div class="stats">
        <div class="stat">
          <span class="stat-label">Scrobbles</span>
          <span class="stat-value">{parseInt(user.playcount).toLocaleString()}</span>
        </div>
      </div>
    </div>
  {:else}
    <div class="empty">Enter a username to load data</div>
  {/if}
</div>

<style>
  .user-card {
    border: 2px solid #000;
    padding: 2rem;
    min-height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h3 {
    margin: 0 0 1rem;
    font-size: 1.75rem;
    font-weight: 900;
    letter-spacing: -0.02em;
  }

  .stat-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
    color: #666;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 900;
    letter-spacing: -0.02em;
  }

  .loading, .empty {
    color: #999;
  }
</style>
