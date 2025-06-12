import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const recipesDirectory = path.join(process.cwd(), 'content/recipes')

export interface Recipe {
  slug: string
  title: string
  description: string
  cookTime: string
  servings: number
  difficulty?: string
  image?: string
  tags?: string[]
  content: string
  publishedAt?: string
}

export async function getAllRecipes(): Promise<Recipe[]> {
  if (!fs.existsSync(recipesDirectory)) {
    fs.mkdirSync(recipesDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(recipesDirectory)
  const recipes = fileNames
    .filter(name => name.endsWith('.mdx'))
    .map((name) => {
      const slug = name.replace(/\.mdx$/, '')
      const fullPath = path.join(recipesDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      const recipe: Recipe = {
        slug,
        title: data.title || slug.replace(/-/g, ' '),
        description: data.description || '',
        cookTime: data.cookTime || '30 minutes',
        servings: data.servings || 4,
        difficulty: data.difficulty,
        image: data.image,
        tags: data.tags || [],
        content,
        publishedAt: data.publishedAt,
      }

      return recipe
    })

  return recipes.sort((a, b) => {
    if (a.publishedAt && b.publishedAt) {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    }
    return a.title.localeCompare(b.title)
  })
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    const fullPath = path.join(recipesDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const recipe: Recipe = {
      slug,
      title: data.title || slug.replace(/-/g, ' '),
      description: data.description || '',
      cookTime: data.cookTime || '30 minutes',
      servings: data.servings || 4,
      difficulty: data.difficulty,
      image: data.image,
      tags: data.tags || [],
      content,
      publishedAt: data.publishedAt,
    }

    return recipe
  } catch (error) {
    console.error(`Error reading recipe ${slug}:`, error)
    return null
  }
} 