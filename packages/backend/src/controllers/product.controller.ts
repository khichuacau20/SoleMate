import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  images: z.array(z.string()),
  category: z.string(),
  brand: z.string().optional(),
  variants: z.array(
    z.object({
      size: z.string(),
      color: z.string(),
      sku: z.string(),
      price: z.number().positive(),
      inventory: z.number().int().min(0),
    })
  ),
});

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = productSchema.parse(req.body);

    const product = await prisma.product.create({
      data: {
        ...productData,
        variants: {
          create: productData.variants,
        },
      },
      include: {
        variants: true,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, brand, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    const where: any = {};

    if (category) where.category = category;
    if (brand) where.brand = brand;
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        variants: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });

    const total = await prisma.product.count({ where });

    res.json({
      products,
      pagination: {
        total,
        pages: Math.ceil(total / Number(limit)),
        currentPage: Number(page),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        variants: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productData = productSchema.parse(req.body);

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...productData,
        variants: {
          deleteMany: {},
          create: productData.variants,
        },
      },
      include: {
        variants: true,
      },
    });

    res.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
