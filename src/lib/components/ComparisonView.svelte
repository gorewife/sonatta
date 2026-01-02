<script lang="ts">
  import type { ComparisonData } from '../types';
  import ArtistList from './ArtistList.svelte';

  interface Props {
    comparison: ComparisonData | null;
    user1Name: string;
    user2Name: string;
  }

  let { comparison, user1Name, user2Name }: Props = $props();
</script>

{#if comparison}
  <div class="comparison-view">
    <div class="compatibility">
      <h2>Taste Compatibility</h2>
      <span class="score">{comparison.tasteCompatibility.toFixed(1)}%</span>
      <span class="label">Match</span>
    </div>

    <div class="comparison-grid">
      <ArtistList artists={comparison.commonArtists} title="Common" />
      <ArtistList artists={comparison.user1Only} title={user1Name} />
      <ArtistList artists={comparison.user2Only} title={user2Name} />
    </div>
  </div>
{/if}

<style>
  .comparison-view {
    margin-top: 3rem;
  }

  .compatibility {
    text-align: center;
    margin-bottom: 3rem;
    padding: 3rem 0;
    border-top: 2px solid #000;
    border-bottom: 2px solid #000;
  }

  .compatibility h2 {
    margin: 0 0 1rem;
    font-size: 1rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .score {
    font-size: 5rem;
    font-weight: 900;
    letter-spacing: -0.05em;
    line-height: 1;
  }

  .label {
    color: #666;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
  }

  .comparison-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
</style>
