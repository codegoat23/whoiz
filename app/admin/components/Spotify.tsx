
'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DiscAlbum, AudioWaveform, PersonStanding, Share2, Plus } from 'lucide-react'
import React, { useState } from 'react'

interface SpotifyProps{
  id: string;
  spotifyAcc?: string |null ;
  favSong?: string | null;
  favPlaylist?: string | null;
  favArtist?: string | null;
}

function Spotify({id , spotifyAcc,favSong, favPlaylist, favArtist}: SpotifyProps) {
   const [SpotifyAcc, setSpotifyAcc] = useState(spotifyAcc ?? "");
    const [FavArtist, setFavArtist] = useState(favArtist ?? "");
    const [FavPlaylist, setFavPlaylist] = useState(favPlaylist ?? "");
    const [FavSong, setFavSong] = useState(favSong ?? "");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

      const handleSave = async () => {
    try {
      setLoading(true);
      setMessage(null);
      setError(null);

      const res = await fetch("/api/spotify", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          favArtist:FavArtist,
          spotifyAcc:SpotifyAcc,
          favSong: FavSong,
          favPlaylist:FavPlaylist,

        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update Spotify Info");
      }

      setMessage("Spotify Info  updated successfully ✅");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex gap-8 w-full max-w-6xl mx-auto py-5">
      <div className="flex flex-col gap-5 rounded-2xl shadow p-6 border h-96 w-96">
        <div className='flex flex-row justify-between items-center'>
          <img src="/spotify.png" alt="" className="size-6.5" />
           <div className="flex justify-end pt-2">
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </div>
        </div>
        

        <Accordion type="single" collapsible className="space-y-2">
          {/* 1. Favorite Playlist */}
          <AccordionItem value="playlist">
            <AccordionTrigger
              className="border h-12 bg-purple-600 w-85 rounded-none p-0"
            >
              <div className="flex flex-row w-full h-full">
                <div className="flex justify-center items-center w-12 bg-white h-full">
                  <DiscAlbum className="text-black/60" />
                </div>
                <div className="p-1.5 w-60 text-left">
                  <span className="text-[13px]">Share your Favorite Playlist</span>
                </div>
               
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 text-sm gap-1.5 flex flex-col">
              <Label>Paste your Playlist Link</Label>
              <Input
               value={FavPlaylist}
              onChange={(e) => setFavPlaylist(e.target.value)}
               placeholder='https://open.spotify.com/playlist/'
              
              />
              
            </AccordionContent>
          </AccordionItem>

          {/* 2. Spotify Account */}
          <AccordionItem value="account">
            <AccordionTrigger
              className="border h-12 bg-green-400 w-85 rounded-none p-0"
            >
              <div className="flex flex-row w-full h-full">
                <div className="flex justify-center items-center w-12 bg-white h-full">
                  <Share2 className="text-black/60" />
                </div>
                <div className="p-1.5 w-60 text-left">
                  <span className="text-[13px]">Share your Spotify account</span>
                </div>
              
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 text-sm flex flex-col gap-1.5">
               <Label>Paste your Account Link</Label>
              <Input 
                value = {SpotifyAcc}
              onChange={(e) => setSpotifyAcc(e.target.value)}
              placeholder='https://open.spotify.com/playlist/'
              
              />
            </AccordionContent>
          </AccordionItem>

          {/* 3. Favorite Song */}
          <AccordionItem value="song">
            <AccordionTrigger
              className="border h-12 bg-pink-400 w-85 rounded-none p-0"
            >
              <div className="flex flex-row w-full h-full">
                <div className="flex justify-center items-center w-12 bg-white h-full">
                  <AudioWaveform className="text-black/60" />
                </div>
                <div className="p-1.5 w-60 text-left">
                  <span className="text-[13px]">Share your Favorite Song</span>
                </div>
               
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 text-sm flex flex-col gap-1.5">
              <Label>Paste your Song Link</Label>
              <Input 
                value={FavSong}
              onChange={(e) => setFavSong(e.target.value)}
              placeholder='https://open.spotify.com/playlist/'/>
            </AccordionContent>
          </AccordionItem>

          {/* 4. Favorite Artist */}
          <AccordionItem value="artist">
            <AccordionTrigger
              className="border h-12 bg-zinc-300 w-85 rounded-none p-0"
            >
              <div className="flex flex-row w-full h-full">
                <div className="flex justify-center items-center w-12 bg-white h-full">
                  <PersonStanding className="text-black/60" />
                </div>
                <div className="p-1.5 w-60 text-left">
                  <span className="text-[13px]">Share your Favourite Artist</span>
                </div>
               
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 text-sm flex flex-col gap-1.5">
               <Label>Paste your Artist Link</Label>
              <Input
                value={FavArtist}
              onChange={(e) => setFavArtist(e.target.value)}
              placeholder='https://open.spotify.com/playlist/'/>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
          {message && (
          <Alert className="mt-2">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mt-2" variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}

export default Spotify
