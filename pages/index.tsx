import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getAllRecipes, Recipe } from '../lib/recipes'

interface HomeProps {
  recipes: Recipe[]
}

export default function Home({ recipes }: HomeProps) {
  return (
    <>
      <Head>
        <title>Shredded Chicken Recipes - Delicious Chicken Recipe Collection</title>
        <meta name="description" content="Discover amazing shredded chicken recipes for every occasion. Easy, healthy, and delicious meals for your family." />
        <link rel="canonical" href="https://shreddedchickenrecipes.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Shredded Chicken Recipes
            </h1>
            <p className="text-gray-600 mt-2">
              Delicious chicken recipes for every occasion
            </p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <article
                key={recipe.slug}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {recipe.image && (
                  <div className="aspect-video bg-gray-200">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {recipe.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {recipe.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>⏱️ {recipe.cookTime}</span>
                    <span>👥 Serves {recipe.servings}</span>
                  </div>
                  <Link
                    href={`/${recipe.slug}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View Recipe
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </main>

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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recipes = await getAllRecipes()
  
  return {
    props: {
      recipes,
    },
  }
} 