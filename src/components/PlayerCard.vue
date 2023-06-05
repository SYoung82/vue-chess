<script lang="ts">
import { ChessService } from '@/services/chess.service';
import { getDateFromEpoch, getShortDate } from '@/utils/dateUtils';
import type { Player } from '@/services/models/player.model';
import type { PlayerStats } from '@/services/models/playerStats.model';
import type { PropType } from 'vue';

export default {
  props: {
    player: {
      type: Object as PropType<Player>,
      required: true,
    },
  },
  data(): { country?: string; stats?: PlayerStats } {
    return {
      country: '',
      stats: {},
    };
  },
  methods: {
    fetchCountry() {
      const result = ChessService.getPlayerCountry(this.player.country);

      result
        .then((response) => (this.country = response.body.name))
        .catch(() => (this.country = undefined));
    },
    fetchPlayerStats() {
      const result = ChessService.getPlayerStats(this.player.username);

      result.then((response) => (this.stats = response.body)).catch(() => (this.stats = undefined));
    },
    getDateString(epochDate: number | undefined) {
      return getShortDate(getDateFromEpoch(epochDate));
    },
  },
  beforeMount() {
    this.fetchCountry();
    this.fetchPlayerStats();
  },
  beforeUpdate() {
    this.fetchCountry();
    this.fetchPlayerStats();
  },
};
</script>

<template>
  <h1>User</h1>
  <div>
    <a :href="player.url" target="_blank" rel="noopener noreferrer" class="username">{{
      player.username
    }}</a
    >, {{ country }}
  </div>
  <div>
    <img :src="player.avatar" :alt="player.username" />
  </div>
  <div>
    <h3>Daily Best</h3>
    <ul>
      <li>
        Game:
        <a :href="stats?.chess_daily?.best?.game" target="_blank" rel="noopener noreferrer">{{
          stats?.chess_daily?.best?.game
        }}</a>
      </li>
      <li>
        <div>Date: {{ getDateString(stats?.chess_daily?.best?.date) }}</div>
      </li>
      <li>
        <div>Rating: {{ stats?.chess_daily?.best?.rating }}</div>
      </li>
    </ul>
  </div>
  <!-- <pre>{{ stats }}</pre> -->
</template>

<style scoped>
h3 {
  font-size: 1.2rem;
}

.username {
  font-size: 1.2rem;
}
</style>
