import { PrismaClient } from "@prisma/client";
import { IProperty } from "../types/property.types";

const prisma = new PrismaClient();

/**
 * @description Create a new property
 * @param {Omit<IProperty, "id" | "createdAt" | "updatedAt">} propertyData - Property data
 * @returns {Promise<IProperty>} - Created property
 */
export const createProperty = async (
  hostId: string,
  propertyData: Omit<IProperty, "id" | "createdAt" | "updatedAt">
): Promise<IProperty> => {
  const property = await prisma.property.create({
    data: { ...propertyData, hostId: hostId },
  });

  return property;
};

/**
 * @description Get Property by ID
 * @param {string} id - Property ID
 */
export const getPropertyById = async (
  id: string,
  hostId?: string
): Promise<IProperty | null> => {
  const property = await prisma.property.findUnique({
    where: {
      id, ...(hostId && { hostId }),
    },
  });
  return property;
};

/**
 * @description Get All properties
 * @returns {Promise<IProperty[]>} - List of properties
 */
export const getAllProperties = async (hostId?: string): Promise<IProperty[]> => {
  const properties = await prisma.property.findMany({ where: { hostId }, });
  return properties;
};

/**
 * @description Update property
 * @param {string} id - Property ID
 * @param {Partial<IProperty>} propertyData - Property data
 * @returns {Promise<IProperty>} - Updated property
 */
export const updateProperty = async (
  id: string,
  propertyData: Partial<IProperty>
): Promise<IProperty> => {
  const property = await prisma.property.update({
    where: { id },
    data: propertyData,
  });
  return property;
};

/**
 * @description Delete property
 * @param {string} id - Property ID
 * @returns {Promise<IProperty>} - Deleted property
 */
export const deleteProperty = async (id: string, hostId?: string): Promise<IProperty> => {
  const property = await prisma.property.delete({ where: {  id, ...(hostId && { hostId }), } });
  return property;
};
