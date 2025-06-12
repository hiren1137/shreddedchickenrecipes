import Head from 'next/head'
import Link from 'next/link'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found - Shredded Chicken Recipes</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <link rel="canonical" href="https://shreddedchickenrecipes.com/404" />
      </Head>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Recipe Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like this recipe got lost in the kitchen! Let's get you back to our delicious collection.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Browse All Recipes
            </Link>
            
            <div className="text-sm text-gray-500">
              <p>Looking for something specific?</p>
              <p>Try searching from our homepage</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 