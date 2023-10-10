import { useEffect, useRef, useState } from 'react'
import Frame, { useFrame } from 'react-frame-component'

import {
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
  type MediaPlayerInstance,
  MediaErrorDetail,
  MediaErrorEvent,
} from '@vidstack/react'

import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default'
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css'

import { VideoLayout } from '../components/layouts/video-layout'
import { textTracks } from './tracks'

// Inject styles into iframe
function FrameContentWrapper({ children }: { children: JSX.Element }) {
  const { document: doc } = useFrame()

  useEffect(() => {
    document.head.querySelectorAll('style').forEach((style) => {
      const frameStyles = style.cloneNode(true)
      doc?.head.append(frameStyles)
    })
    // inject the production minified styles into the iframe
    document.head.querySelectorAll('link[as="style"]').forEach((ele) => {
      doc?.head.append(ele.cloneNode(true))
    })
    document.head.querySelectorAll('link[rel="stylesheet"]').forEach((ele) => {
      doc?.head.append(ele.cloneNode(true))
    })
  }, [doc])

  return children
}

export default function Player() {
  let defaultPlayer = useRef<MediaPlayerInstance>(null)
  let customPlayer = useRef<MediaPlayerInstance>(null)

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  function onError(detail: MediaErrorDetail, nativeEvent: MediaErrorEvent) {
    console.log('onError')
    console.log(detail)
    console.log(nativeEvent)
  }

  return isClient ? (
    <Frame
      initialContent='<!DOCTYPE html><html class="h-full"><head></head><body class="h-full"><div class="w-full flex justify-center"></div></body></html>'
      className='flex w-full min-h-screen items-center justify-center'
    >
      <FrameContentWrapper>
        <div className="flex flex-col gap-8 p-8">
          <h2>DefaultVideoLayout</h2>
          <MediaPlayer
            ref={defaultPlayer}
            className='w-full max-w-3xl aspect-video bg-slate-900 text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4'
            title='Sprite Fight'
            src='https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/low.mp4'
            crossorigin
            onError={onError}
            aspectRatio='16:9'
          >
            <MediaProvider>
              <Poster
                className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
                src="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=1200"
                alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
              />
              {textTracks.map((track) => (
                <Track {...track} key={track.src} />
              ))}
            </MediaProvider>
            <DefaultVideoLayout icons={defaultLayoutIcons} />
          </MediaPlayer>

          {/* Custom Video Layout */}

          <h2>Custom Video Layout</h2>
          <MediaPlayer
            ref={customPlayer}
            className='w-full max-w-3xl aspect-video bg-slate-900 text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4'
            title='Sprite Fight'
            src='https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/low.mp4'
            crossorigin
            onError={onError}
            aspectRatio='16:9'
          >
            <MediaProvider>
              <Poster
                className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
                src="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=1200"
                alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
              />
              {textTracks.map((track) => (
                <Track {...track} key={track.src} />
              ))}
            </MediaProvider>

            <VideoLayout thumbnails='https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt' />
          </MediaPlayer>
        </div>
      </FrameContentWrapper>
    </Frame>
  ) : null
}
