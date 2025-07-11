'use client'
import React from 'react'

export const ShareButton = ({
  platform,
  url,
  title,
}: {
  platform: string
  url: string
  title: string
}) => {
  const handleShare = async () => {
    const fullText = `${title} - ${url}`

    // Use Web Share API if supported and not "copy"
    if (platform !== 'copy' && navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch (err) {
        console.warn('Web Share failed, falling back...', err)
      }
    }

    switch (platform) {
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank',
          'width=600,height=400',
        )
        break
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          '_blank',
          'width=600,height=400',
        )
        break
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          '_blank',
          'width=600,height=400',
        )
        break
      case 'copy':
        try {
          await navigator.clipboard.writeText(fullText)
          alert('Link copied to clipboard!')
        } catch (err) {
          console.error('Failed to copy:', err)
          alert('Copy failed.')
        }
        break
      default:
        console.warn('Unsupported platform:', platform)
    }
  }

  const icons = {
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    copy: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
  }

  const colors = {
    facebook: 'bg-blue-600 hover:bg-blue-700',
    twitter: 'bg-black hover:bg-gray-800',
    linkedin: 'bg-blue-700 hover:bg-blue-800',
    copy: 'bg-gray-600 hover:bg-gray-700',
  }

  return (
    <button
      onClick={handleShare}
      className={`w-full flex text-sm items-center justify-center px-4 py-2 text-white rounded-lg transition cursor-pointer ${colors[platform as keyof typeof colors]}`}
    >
      <span className="mr-2">{icons[platform as keyof typeof icons]}</span>
      {platform === 'copy' ? 'Copy Link' : platform.charAt(0).toUpperCase() + platform.slice(1)}
    </button>
  )
}
