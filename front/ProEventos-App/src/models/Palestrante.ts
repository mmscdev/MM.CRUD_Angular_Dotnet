import { Evento } from './Evento';
import { RedeSocial } from './RedeSocial';

export interface Palestrante {
  id: number;
  miniCurriculo: string;
  redesSociais: RedeSocial[];
  palestrantesEventos: Evento[];
}
