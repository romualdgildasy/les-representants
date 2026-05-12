import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { MusicService, Track } from '../../core/services/music';
import { PlayerService } from '../../core/services/player';


@Component({
  selector: 'app-home',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected readonly music = inject(MusicService);
  protected readonly player = inject(PlayerService);

  protected readonly currentHitIndex = signal(0);

  protected readonly albumStats = [
    { val: '12',    label: 'Titres' },
    { val: '47 min',label: 'Durée' },
    { val: '3 ans', label: 'Création' },
  ];

  playHero() {
    const first = this.music.hits[0];
    if (this.player.currentTrack()?.id === first.id) {
      this.player.togglePlay();
    } else {
      this.player.loadAndPlay(first);
      this.currentHitIndex.set(0);
    }
  }

  playHit(track: Track, index: number) {
    this.currentHitIndex.set(index);
    if (this.player.currentTrack()?.id === track.id) {
      this.player.togglePlay();
    } else {
      this.player.loadAndPlay(track);
    }
  }

  nextHit() {
    const next = (this.currentHitIndex() + 1) % this.music.hits.length;
    this.currentHitIndex.set(next);
    this.player.loadAndPlay(this.music.hits[next]);
  }

  prevHit() {
    const prev = (this.currentHitIndex() - 1 + this.music.hits.length) % this.music.hits.length;
    this.currentHitIndex.set(prev);
    this.player.loadAndPlay(this.music.hits[prev]);
  }

  isCurrentHit(track: Track): boolean {
    return this.player.currentTrack()?.id === track.id;
  }

  onProgressClick(event: MouseEvent) {
    const bar = event.currentTarget as HTMLElement;
    this.player.seek(event.offsetX / bar.offsetWidth);
  }
}