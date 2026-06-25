'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { navigationItems } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();
  const { currentUser, isLandlord, isAgent } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['Operations', 'Management']);

  // Filter navigation items based on user role
  const filteredNavItems = navigationItems.filter((item) => item.roles.includes(currentUser.role));

  const toggleSubMenu = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) => {
    if (href === '#') return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  const NavLink = ({
    item,
    nested = false,
  }: {
    item: (typeof filteredNavItems)[0];
    nested?: boolean;
  }) => {
    const Icon = item.icon;
    const active = isActive(item.href);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.label);

    const baseClasses = cn(
      'w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
      nested ? 'ml-4 pr-2' : '',
      active && !hasChildren
        ? 'bg-primary text-primary-foreground'
        : 'text-foreground/70 hover:text-foreground hover:bg-accent'
    );

    return (
      <div key={item.label}>
        {item.href !== '#' && !hasChildren ? (
          <Link href={item.href} className={baseClasses}>
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span>{item.label}</span>
          </Link>
        ) : (
          <button
            onClick={() => hasChildren && toggleSubMenu(item.label)}
            className={baseClasses}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="flex-1 text-left">{item.label}</span>
            {hasChildren && (
              <ChevronDown
                className={cn('w-4 h-4 transition-transform', isExpanded ? 'rotate-180' : '')}
              />
            )}
          </button>
        )}

        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children?.map((child) => {
              const childActive = isActive(child.href);
              const ChildIcon = child.icon;
              return (
                <Link
                  key={child.label}
                  href={child.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium ml-4 transition-all',
                    childActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                  )}
                >
                  <ChildIcon className="w-4 h-4 flex-shrink-0" />
                  <span>{child.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center gap-2 fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-accent rounded-lg"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col transition-all duration-300 z-40',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-border">
          <h1 className="text-xl font-bold text-primary">RentFlow</h1>
          <p className="text-xs text-muted-foreground mt-1">Property Management</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {filteredNavItems.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </nav>

        {/* User Info */}
        <div className="px-6 py-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">
                {currentUser.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
