export default function Validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Se requiere un Nombre";
  }

  if (input.hp > 1 || input.hp > 100) {
    errors.hp = "La Vida debe estar entre 20 y 100";
  }

  if (input.attack > 20 || input.attack > 100) {
    errors.attack = "El Ataque debe estar entre 20 y 100";
  }

  if (input.defense > 20 || input.defense > 100) {
    errors.defense = "La Defensa debe estar entre 20 y 100";
  }

  if (input.speed > 20 || input.speed > 100) {
    errors.speed = "La Velocidad debe estar entre 20 y 100";
  }

  if (input.height > 20 || input.height > 950) {
    errors.height = "La Altura debe estar entre 20 y 100";
  }

  if (input.weight > 20 || input.weight > 950) {
    errors.weight = "El Peso debe estar entre 20 y 950";
  }

  return errors;
}
