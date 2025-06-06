export const PolygonLogo = ({ className = "" }: { className?: string }) => {
  return (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#8247E5" />
      <path
        d="M66.5 38.8L54.1 31.2C52.5 30.2 50.5 30.2 48.9 31.2L36.5 38.8C34.9 39.8 33.9 41.5 33.9 43.3V58.5C33.9 60.3 34.9 62 36.5 63L48.9 70.6C50.5 71.6 52.5 71.6 54.1 70.6L66.5 63C68.1 62 69.1 60.3 69.1 58.5V43.3C69.1 41.5 68.1 39.8 66.5 38.8ZM51.5 59.9L40.5 53.4V46.4L51.5 52.9L62.5 46.4V53.4L51.5 59.9ZM51.5 45.9L40.5 39.4V32.4L51.5 38.9L62.5 32.4V39.4L51.5 45.9Z"
        fill="white"
      />
    </svg>
  )
}
