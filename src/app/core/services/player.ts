import { Injectable, signal } from '@angular/core';
import { Track } from './music';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  // Déclaration des signals (Angular 19)
  readonly currentTrack = signal<Track | null>(null);
  readonly isPlaying = signal<boolean>(false);
  readonly progress = signal<number>(0);
  readonly currentTime = signal<number>(0);
  readonly duration = signal<number>(225); // Fausse durée de 3m45s pour le design

  togglePlay() {
    if (!this.currentTrack()) return;
    this.isPlaying.update(val => !val);
  }

  loadAndPlay(track: Track) {
    this.currentTrack.set(track);
    this.isPlaying.set(true);
    this.progress.set(0);
    this.currentTime.set(0);
    
    // Plus tard, on connectera ça à la vraie balise <audio> HTML5
  }

  seek(percentage: number) {
    this.progress.set(percentage * 100);
    this.currentTime.set(this.duration() * percentage);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}