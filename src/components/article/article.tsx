
import { ArticleContent, ArticleImage, ArticleMedia, ArticleTitle } from '@/components/article'
import { cn } from '@/utils/cn'
import type { PropsWithChildren } from 'react'
import invariant from 'tiny-invariant'

interface ArticleProps extends PropsWithChildren {
  className?: string
  imageAlt?: string
  imageSrc?: string
  title: string
}

const Article: React.FC<ArticleProps> = ({ className, children, imageAlt, imageSrc, title }) => {
  if (imageSrc) {
    invariant(imageAlt, 'Image alt text is required.')
  }

  return (
    <article className={cn('article text-center lg:w-full lg:py-20 lg:text-left', className)}>
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="relative lg:flex">
          <ArticleContent>
            <header>
              <ArticleTitle>{title}</ArticleTitle>
            </header>
            {children}
          </ArticleContent>

          {imageSrc && (
            <ArticleMedia>
              <ArticleImage alt={imageAlt!} src={imageSrc} />
            </ArticleMedia>
          )}
        </div>
      </div>
    </article>
  )
}

export default Article

