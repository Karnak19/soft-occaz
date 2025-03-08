'use client';

import France from '@svg-country-maps/france.departments';
import { usePlausible } from 'next-plausible';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { cn } from '$/utils/cn';
import { departmentNumbers } from '$/utils/departments';

const DepartmentsMapSection = () => {
  const router = useRouter();
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const plausible = usePlausible();

  const handleDepartmentClick = (departmentName: string) => {
    const departmentNumber = departmentNumbers[departmentName];

    if (departmentNumber) {
      plausible('department_click', { props: { department: departmentNumber } });
      router.push(`/annonces?department=${departmentNumber}`);
    }
  };

  const handleMouseMove = (event: React.MouseEvent, department: string) => {
    setTooltip({
      text: `${department} (${departmentNumbers[department]})`,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleMouseEnter = (department: string) => {
    router.prefetch(`/annonces?department=${departmentNumbers[department]}`);
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <section className="relative container mx-auto px-4">
      {/* Desktop version */}
      <div className="hidden md:block">
        <div className="xl:absolute top-0 left-0 text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Trouvez des annonces par département</h2>
          <p className="text-muted-foreground">Cliquez sur un département pour voir les annonces disponibles dans votre région</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <svg viewBox={France.viewBox} className="w-full h-auto">
            {France.locations.map((department) => (
              <path
                key={department.id}
                id={department.id}
                name={department.name}
                d={department.path}
                className={cn(
                  'cursor-pointer transition-colors duration-200',
                  'fill-background stroke-border hover:stroke-primary hover:fill-primary/60',
                )}
                onClick={() => handleDepartmentClick(department.name)}
                onMouseEnter={() => handleMouseEnter(department.name)}
                onMouseMove={(e) => handleMouseMove(e, department.name)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </svg>
          {tooltip && (
            <div
              className="fixed z-50 px-2 py-1 text-sm bg-card text-card-foreground shadow-md rounded-md pointer-events-none"
              style={{
                left: tooltip.x + 10,
                top: tooltip.y + 10,
              }}
            >
              {tooltip.text}
            </div>
          )}
        </div>
      </div>

      {/* Mobile version */}
      <div className="md:hidden text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Recherchez par département</h2>
        <p className="text-muted-foreground mb-6">
          Utilisez notre moteur de recherche pour trouver des annonces dans votre département
        </p>
        <button
          onClick={() => router.push('/annonces')}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Voir toutes les annonces
        </button>
      </div>
    </section>
  );
};

export default DepartmentsMapSection;
