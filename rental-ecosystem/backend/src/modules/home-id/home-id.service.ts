import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HomeIdService {
  constructor(private prisma: PrismaService) {}

  /**
   * Generate a unique Home ID for a property
   * Format: RF-XXXX-XXXX (e.g. RF-A3KM-9XQ2)
   * The ID is permanent and uniquely identifies the property
   */
  async generate(propertyId: string): Promise<{ homeId: string }> {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (property.homeId) {
      throw new ConflictException('Property already has a Home ID assigned');
    }

    const homeId = this.generateHomeIdString();

    await this.prisma.property.update({
      where: { id: propertyId },
      data: { homeId },
    });

    return { homeId };
  }

  /**
   * Lookup a property by its Home ID
   */
  async lookup(homeId: string) {
    const property = await this.prisma.property.findUnique({
      where: { homeId },
      include: {
        media: true,
        owner: {
          select: { id: true, fullName: true, phoneNumber: true },
        },
      },
    });

    if (!property) {
      throw new NotFoundException('No property found with this Home ID');
    }

    return property;
  }

  /**
   * Validate a Home ID format without DB lookup
   */
  validate(homeId: string): boolean {
    const pattern = /^RF-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    return pattern.test(homeId);
  }

  /**
   * Get property by Home ID (alias for lookup, used by requests module)
   */
  async getPropertyByHomeId(homeId: string) {
    return this.lookup(homeId);
  }

  private generateHomeIdString(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const segment = (length: number) =>
      Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `RF-${segment(4)}-${segment(4)}`;
  }
}