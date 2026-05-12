import { Injectable } from '@angular/core';

export interface Track {
  id: string;
  emoji: string;
  title: string;
  album: string;
  duration: string;
  audioUrl: string;
}

export interface Album {
  id: string;
  coverEmoji: string;
  isNew: boolean;
  type: string;
  title: string;
  year: string;
  tracksCount: number;
  price?: number;
}

@Injectable({ providedIn: 'root' })
export class MusicService {

  readonly hits: Track[] = [
    {
      id: '1',
      emoji: '🔥',
      title: 'La Rue a parlé',
      album: 'Premiers Pas',
      duration: '3:45',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      id: '2',
      emoji: '🌑',
      title: 'Sombre Époque',
      album: 'Projet X',
      duration: '4:12',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
      id: '3',
      emoji: '⚔️',
      title: 'Intro (Freestyle)',
      album: 'Exclusivité',
      duration: '2:30',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
    {
      id: '4',
      emoji: '💎',
      title: 'Billet Violet',
      album: 'Projet X',
      duration: '3:10',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    },
  ];

  readonly discography: Album[] = [
    {
      id: 'ames-libres',
      coverEmoji: '🎵',
      isNew: true,
      type: 'Album',
      title: 'Âmes Libres',
      year: '2025',
      tracksCount: 12,
      price: 6500,
    },
    {
      id: 'projet-x',
      coverEmoji: '📼',
      isNew: false,
      type: 'EP',
      title: 'Projet X',
      year: '2023',
      tracksCount: 5,
      price: 2000,
    },
    {
      id: 'debut',
      coverEmoji: '🎤',
      isNew: false,
      type: 'Mixtape',
      title: 'Premiers Pas',
      year: '2021',
      tracksCount: 15,
    },
  ];
}