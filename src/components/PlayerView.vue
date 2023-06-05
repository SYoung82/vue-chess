<script lang="ts">
import { ChessService } from '@/services/chess.service';
import PlayerCard from '@/components/PlayerCard.vue';
import type { Player } from '@/services/models/player.model';

export default {
  components: { PlayerCard: PlayerCard },
  data(): { playerId: string; player?: Player; error?: string } {
    return {
      playerId: '',
      player: undefined,
      error: undefined,
    };
  },
  methods: {
    fetchPlayer() {
      const result = ChessService.getPlayer(this.playerId);

      result
        .then((response) => {
          this.player = response.body;
          this.error = undefined;
          this.playerId = '';
        })
        .catch((error) => {
          this.player = undefined;
          this.error = error.message;
        });
    },
  },
};
</script>

<template>
  <form @submit.prevent>
    <input v-model="playerId" type="text" placeholder="Player" />
    <button @click="fetchPlayer">Get Player</button>
    <div v-if="error" id="error" class="error">{{ error }}</div>
  </form>
  <div class="player-card">
    <div v-if="player" id="player"><PlayerCard :player="player" /></div>
  </div>
</template>

<style scoped>
form {
  text-align: center;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
  text-align: center;
}

h3 {
  font-size: 1.2rem;
}

.error {
  color: red;
}

.player-card {
  margin-top: 2rem;
}
</style>
