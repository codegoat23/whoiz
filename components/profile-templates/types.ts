import { Showcase as ShowcaseType } from "@/lib/type";
import { CARD_THEMES, CardThemeId } from "@/lib/cardThemes";

export interface ProfileUser {
  id: string;
  username: string | null;
  name: string;
  bio: string | null;
  avatarUrl: string | null;
  story: string | null;
  favArtist?: string | null;
  favPlaylist?: string | null;
  favSong?: string | null;
  spotifyAcc?: string | null;
  cardTheme: string;
  customBgImageUrl?: string | null;
  profileTemplate?: string | null;
  createdAt: Date;
  links: Array<{
    id: string;
    label: string;
    url: string;
    platform: string | null;
    visible?: boolean;
  }>;
  showcases: ShowcaseType[];
  socialConnects: Array<{
    id: string;
    platform: string;
    url: string;
    visible?: boolean;
  }>;
}

export interface ProfileTemplateProps {
  user: ProfileUser;
  cardTheme: (typeof CARD_THEMES)[CardThemeId];
  cardBackgroundImage: string;
  onEditBackground?: () => void;
}
