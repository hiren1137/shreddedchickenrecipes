import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import { getRecipeBySlug, Recipe } from '../lib/recipes'

interface RecipePageProps {
  recipe: Recipe
  mdxSource: MDXRemoteSerializeResult
}

const components = {
  h1: (props: any) => <h1 className="text-4xl font-bold text-gray-900 mb-6" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-semibold text-gray-800 mb-4 mt-8" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6" {...props} />,
  p: (props: any) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2" {...props} />,
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  strong: (props: any) => <strong className="font-semibold text-gray-900" {...props} />,
  em: (props: any) => <em className="italic" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 text-gray-700" {...props} />
  ),
}

export default function RecipePage({ recipe, mdxSource }: RecipePageProps) {
  const fullUrl = `https://shreddedchickenrecipes.com/${recipe.slug}`

  return (
    <>
      <Head>
        <title>{recipe.title} - Shredded Chicken Recipes</title>
        <meta name="description" content={recipe.description} />
        <link rel="canonical" href={fullUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph */}
        <meta property="og:title" content={recipe.title} />
        <meta property="og:description" content={recipe.description} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content="article" />
        {recipe.image && <meta property="og:image" content={recipe.image} />}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={recipe.title} />
        <meta name="twitter:description" content={recipe.description} />
        {recipe.image && <meta name="twitter:image" content={recipe.image} />}
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <Link href="/" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
              ← Back to all recipes
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {recipe.title}
            </h1>
            <p className="text-gray-600 text-lg">
              {recipe.description}
            </p>
          </div>
        </header>

        {/* Recipe Meta */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="font-medium text-gray-900">Cook Time:</span>
                <span className="ml-2">⏱️ {recipe.cookTime}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-900">Servings:</span>
                <span className="ml-2">👥 {recipe.servings}</span>
              </div>
              {recipe.difficulty && (
                <div className="flex items-center">
                  <span className="font-medium text-gray-900">Difficulty:</span>
                  <span className="ml-2">📊 {recipe.difficulty}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hero Image */}
        {recipe.image && (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Recipe Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          <article className="bg-white rounded-lg shadow-sm p-8">
            <div className="prose prose-lg max-w-none">
              <MDXRemote {...mdxSource} components={components} />
            </div>
          </article>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-16">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <p className="text-center text-gray-600">
              © 2024 Shredded Chicken Recipes. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<RecipePageProps> = async ({ params }) => {
  const slug = params?.slug as string

  if (!slug) {
    return {
      notFound: true,
    }
  }

  try {
    const recipe = await getRecipeBySlug(slug)
    
    if (!recipe) {
      return {
        notFound: true,
      }
    }

    const mdxSource = await serialize(recipe.content, {
      mdxOptions: {
        remarkPlugins: [],
      },
    })

    return {
      props: {
        recipe,
        mdxSource,
      },
    }
  } catch (error) {
    console.error('Error loading recipe:', error)
    return {
      notFound: true,
    }
  }
} 