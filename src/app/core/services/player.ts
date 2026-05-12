import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Track } from './music';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private platformId = inject(PLATFORM_ID);
  private audio: HTMLAudioElement | null = null;

  readonly currentTrack = signal<Track | null>(null);
  readonly isPlaying    = signal(false);
  readonly currentTime  = signal(0);
  readonly duration     = signal(0);

  readonly progress = computed(() =>
    this.duration() > 0 ? (this.currentTime() / this.duration()) * 100 : 0
  );

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.audio = new Audio();

    this.audio.addEventListener('timeupdate', () => {
      this.currentTime.set(this.audio!.currentTime);
    });
    this.audio.addEventListener('loadedmetadata', () => {
      this.duration.set(this.audio!.duration);
    });
    this.audio.addEventListener('ended', () => {
      this.isPlaying.set(false);
      this.currentTime.set(0);
    });
    this.audio.addEventListener('error', () => {
      console.warn('Erreur audio — vérifier l\'URL');
      this.isPlaying.set(false);
    });
  }

  loadAndPlay(track: Track) {
    if (!this.audio) return;
    this.currentTrack.set(track);
    this.audio.src = track.audioUrl;
    this.audio.load();
    this.audio.play()
      .then(() => this.isPlaying.set(true))
      .catch(err => console.warn('Lecture bloquée:', err));
  }

  togglePlay() {
    if (!this.audio || !this.currentTrack()) return;
    if (this.isPlaying()) {
      this.audio.pause();
      this.isPlaying.set(false);
    } else {
      this.audio.play()
        .then(() => this.isPlaying.set(true))
        .catch(err => console.warn('Lecture bloquée:', err));
    }
  }

  seek(ratio: number) {
    if (!this.audio || !this.duration()) return;
    this.audio.currentTime = ratio * this.duration();
  }

  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}