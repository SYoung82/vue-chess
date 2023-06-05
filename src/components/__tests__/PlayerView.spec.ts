import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import PlayerView from '../PlayerView.vue';
import { ChessService } from '@/services/chess.service';
import { nextTick } from 'vue';
import mountComponent from '@/testHelpers/mountComponent';
import PlayerCard from '../PlayerCard.vue';

describe('PlayerView', () => {
  let wrapper: ReturnType<typeof mountComponent>;

  vi.mock('@/services/chess.service', () => {
    return {
      ChessService: {
        getPlayer: vi.fn(),
        getPlayerCountry: vi.fn(),
        getPlayerStats: vi.fn(),
      },
    };
  });

  beforeEach(() => {
    wrapper = mountComponent(PlayerView);
    vi.restoreAllMocks();
  });

  it('renders properly', () => {
    expect(wrapper.find('input').attributes('placeholder')).toBe('Player');
    expect(wrapper.find('button').text()).toBe('Get Player');
  });

  it('should fetch the player and clear the input on success', async () => {
    const response = { body: { username: 'test', country: 'US' }, status: 200 };
    const inputValue = 'test';

    (ChessService.getPlayer as Mock).mockResolvedValue(response);
    (ChessService.getPlayerCountry as Mock).mockResolvedValue('United States');
    (ChessService.getPlayerStats as Mock).mockResolvedValue(undefined);

    await wrapper.find('input').setValue(inputValue);
    await wrapper.find('button').trigger('click');

    await nextTick();

    expect(ChessService.getPlayer).toHaveBeenCalledWith(inputValue);
    expect(wrapper.vm.player).toStrictEqual(response.body);
    expect(wrapper.vm.error).toBeUndefined();
    expect(wrapper.findComponent(PlayerCard).text()).toContain(response.body.username);
  });

  it('should fetch the player and not clear the input on failure', async () => {
    const error = { message: 'Not Found', status: 404 };
    (ChessService.getPlayer as Mock).mockRejectedValue(error);
    const inputValue = 'test';

    await wrapper.find('input').setValue(inputValue);
    await wrapper.find('button').trigger('click');

    await nextTick();

    expect(ChessService.getPlayer).toHaveBeenCalledWith(inputValue);
    expect(wrapper.vm.error).toBe('Not Found');
    expect(wrapper.vm.user).toBeUndefined();

    await nextTick();

    expect(wrapper.find('#error').text()).toContain('Not Found');
  });
});
