<script lang="ts">
  let availableUsers = ['rj', 'johndoe', 'musiclover'];
</script>

<div class="mock-notice">
  <div class="notice-header">
    <strong>Mock Mode</strong>
  </div>
  <div class="user-pills">
    {#each availableUsers as user}
      <span class="user-pill">{user}</span>
    {/each}
  </div>
  <p class="hint">Set <code>USE_MOCK_API = false</code> for real data</p>
</div>

<style>
  .mock-notice {
    border: 2px solid #000;
    padding: 1.5rem;
    margin-bottom: 3rem;
    text-align: center;
  }

  .notice-header {
    margin-bottom: 1rem;
  }

  .icon {
    font-size: 1.5rem;
  }

  strong {
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  p {
    color: #666;
    margin: 0.5rem 0;
    font-size: 0.875rem;
  }

  .user-pills {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin: 1rem 0;
  }

  .user-pill {
    border: 2px solid #000;
    padding: 0.5rem 1rem;
    font-weight: 700;
    font-family: monospace;
  }

  .hint {
    font-size: 0.75rem;
    color: #999;
    margin-top: 1rem;
  }

  code {
    font-family: monospace;
    font-weight: 600;
  }
</style>
