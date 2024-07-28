
import Image from 'next/image'
import { cn } from '@/utils/cn'

interface CustomImageProps {
  alt: string
  className?: string
  height?: number
  src: string
  width?: number
}

const CustomImage: React.FC<CustomImageProps> = ({ alt, className, height, src, width }) => {
  return (
    <div className={cn('relative mx-auto lg:aspect-[5/7] lg:w-full', className)}>
      <Image
        alt={alt}
        layout="responsive"
        src={src}
        width={width || 420}
        height={height || 640}
        className="object-cover"
      />
    </div>
  )
}

export default CustomImage

