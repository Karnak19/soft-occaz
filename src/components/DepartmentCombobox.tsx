import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '$/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '$/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '$/components/ui/popover';
import { cn } from '$/utils/cn';

const departments = [
  // Metropolitan France
  { value: '01', label: 'Ain (01)' },
  { value: '02', label: 'Aisne (02)' },
  { value: '03', label: 'Allier (03)' },
  { value: '04', label: 'Alpes-de-Haute-Provence (04)' },
  { value: '05', label: 'Hautes-Alpes (05)' },
  { value: '06', label: 'Alpes-Maritimes (06)' },
  { value: '07', label: 'Ardèche (07)' },
  { value: '08', label: 'Ardennes (08)' },
  { value: '09', label: 'Ariège (09)' },
  { value: '10', label: 'Aube (10)' },
  { value: '11', label: 'Aude (11)' },
  { value: '12', label: 'Aveyron (12)' },
  { value: '13', label: 'Bouches-du-Rhône (13)' },
  { value: '14', label: 'Calvados (14)' },
  { value: '15', label: 'Cantal (15)' },
  { value: '16', label: 'Charente (16)' },
  { value: '17', label: 'Charente-Maritime (17)' },
  { value: '18', label: 'Cher (18)' },
  { value: '19', label: 'Corrèze (19)' },
  { value: '2A', label: 'Corse-du-Sud (2A)' },
  { value: '2B', label: 'Haute-Corse (2B)' },
  { value: '21', label: "Côte-d'Or (21)" },
  { value: '22', label: "Côtes-d'Armor (22)" },
  { value: '23', label: 'Creuse (23)' },
  { value: '24', label: 'Dordogne (24)' },
  { value: '25', label: 'Doubs (25)' },
  { value: '26', label: 'Drôme (26)' },
  { value: '27', label: 'Eure (27)' },
  { value: '28', label: 'Eure-et-Loir (28)' },
  { value: '29', label: 'Finistère (29)' },
  { value: '30', label: 'Gard (30)' },
  { value: '31', label: 'Haute-Garonne (31)' },
  { value: '32', label: 'Gers (32)' },
  { value: '33', label: 'Gironde (33)' },
  { value: '34', label: 'Hérault (34)' },
  { value: '35', label: 'Ille-et-Vilaine (35)' },
  { value: '36', label: 'Indre (36)' },
  { value: '37', label: 'Indre-et-Loire (37)' },
  { value: '38', label: 'Isère (38)' },
  { value: '39', label: 'Jura (39)' },
  { value: '40', label: 'Landes (40)' },
  { value: '41', label: 'Loir-et-Cher (41)' },
  { value: '42', label: 'Loire (42)' },
  { value: '43', label: 'Haute-Loire (43)' },
  { value: '44', label: 'Loire-Atlantique (44)' },
  { value: '45', label: 'Loiret (45)' },
  { value: '46', label: 'Lot (46)' },
  { value: '47', label: 'Lot-et-Garonne (47)' },
  { value: '48', label: 'Lozère (48)' },
  { value: '49', label: 'Maine-et-Loire (49)' },
  { value: '50', label: 'Manche (50)' },
  { value: '51', label: 'Marne (51)' },
  { value: '52', label: 'Haute-Marne (52)' },
  { value: '53', label: 'Mayenne (53)' },
  { value: '54', label: 'Meurthe-et-Moselle (54)' },
  { value: '55', label: 'Meuse (55)' },
  { value: '56', label: 'Morbihan (56)' },
  { value: '57', label: 'Moselle (57)' },
  { value: '58', label: 'Nièvre (58)' },
  { value: '59', label: 'Nord (59)' },
  { value: '60', label: 'Oise (60)' },
  { value: '61', label: 'Orne (61)' },
  { value: '62', label: 'Pas-de-Calais (62)' },
  { value: '63', label: 'Puy-de-Dôme (63)' },
  { value: '64', label: 'Pyrénées-Atlantiques (64)' },
  { value: '65', label: 'Hautes-Pyrénées (65)' },
  { value: '66', label: 'Pyrénées-Orientales (66)' },
  { value: '67', label: 'Bas-Rhin (67)' },
  { value: '68', label: 'Haut-Rhin (68)' },
  { value: '69', label: 'Rhône (69)' },
  { value: '70', label: 'Haute-Saône (70)' },
  { value: '71', label: 'Saône-et-Loire (71)' },
  { value: '72', label: 'Sarthe (72)' },
  { value: '73', label: 'Savoie (73)' },
  { value: '74', label: 'Haute-Savoie (74)' },
  { value: '75', label: 'Paris (75)' },
  { value: '76', label: 'Seine-Maritime (76)' },
  { value: '77', label: 'Seine-et-Marne (77)' },
  { value: '78', label: 'Yvelines (78)' },
  { value: '79', label: 'Deux-Sèvres (79)' },
  { value: '80', label: 'Somme (80)' },
  { value: '81', label: 'Tarn (81)' },
  { value: '82', label: 'Tarn-et-Garonne (82)' },
  { value: '83', label: 'Var (83)' },
  { value: '84', label: 'Vaucluse (84)' },
  { value: '85', label: 'Vendée (85)' },
  { value: '86', label: 'Vienne (86)' },
  { value: '87', label: 'Haute-Vienne (87)' },
  { value: '88', label: 'Vosges (88)' },
  { value: '89', label: 'Yonne (89)' },
  { value: '90', label: 'Territoire de Belfort (90)' },
  { value: '91', label: 'Essonne (91)' },
  { value: '92', label: 'Hauts-de-Seine (92)' },
  { value: '93', label: 'Seine-Saint-Denis (93)' },
  { value: '94', label: 'Val-de-Marne (94)' },
  { value: '95', label: "Val-d'Oise (95)" },
  // DOM-TOM
  { value: '971', label: 'Guadeloupe (971)' },
  { value: '972', label: 'Martinique (972)' },
  { value: '973', label: 'Guyane (973)' },
  { value: '974', label: 'La Réunion (974)' },
  { value: '975', label: 'Saint-Pierre-et-Miquelon (975)' },
  { value: '976', label: 'Mayotte (976)' },
  { value: '977', label: 'Saint-Barthélemy (977)' },
  { value: '978', label: 'Saint-Martin (978)' },
  { value: '984', label: 'Terres australes françaises (984)' },
  { value: '986', label: 'Wallis-et-Futuna (986)' },
  { value: '987', label: 'Polynésie française (987)' },
  { value: '988', label: 'Nouvelle-Calédonie (988)' },
  { value: '989', label: 'Île de Clipperton (989)' },
];

type DepartmentComboboxProps = {
  value?: string;
  onValueChange: (value: string) => void;
  className?: string;
};

export function DepartmentCombobox({ value, onValueChange, className }: DepartmentComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className={cn('w-full justify-between', className)}>
          {value ? departments.find((department) => department.value === value)?.label : 'Sélectionner un département'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Rechercher un département..." />
          <CommandEmpty>Aucun département trouvé.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-auto">
            {departments.map((department) => (
              <CommandItem
                key={department.value}
                value={department.label}
                onSelect={() => {
                  onValueChange(department.value);
                  setOpen(false);
                }}
              >
                <Check className={cn('mr-2 h-4 w-4', value === department.value ? 'opacity-100' : 'opacity-0')} />
                {department.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
