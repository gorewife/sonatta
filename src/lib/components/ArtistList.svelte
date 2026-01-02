<script lang="ts">
  import type { Artist } from '../types';

  interface Props {
    artists: Artist[];
    title: string;
  }

  let { artists, title }: Props = $props();
</script>

<div class="artist-list">
  <h3>{title}</h3>
  <div class="list">
    {#each artists as artist, i}
      <div class="artist-item">
        <span class="rank">{i + 1}</span>
        <div class="artist-info">
          <span class="artist-name">{artist.name}</span>
          <span class="playcount">{parseInt(artist.playcount).toLocaleString()} plays</span>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .artist-list {
    border: 2px solid #000;
    padding: 1.5rem;
  }

  h3 {
    margin: 0 0 1.5rem;
    font-size: 1.25rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .artist-item {
    display: flex;
    gap: 1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid #e5e5e5;
  }

  .artist-item:last-child {
    border-bottom: none;
  }

  .rank {
    font-weight: 900;
    min-width: 2rem;
    color: #ccc;
  }

  .artist-info {
    flex: 1;
  }

  .artist-name {
    font-weight: 600;
  }

  .playcount {
    color: #666;
    font-size: 0.875rem;
  }
</style>
