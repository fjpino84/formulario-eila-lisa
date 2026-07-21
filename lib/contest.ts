export interface ChallengeOption {
  id: string;
  label: string;
  correct: boolean;
}

export const CHALLENGE_OPTIONS: ChallengeOption[] = [
  { id: "numero_boleta", label: "El número de boleta es sospechoso", correct: false },
  { id: "monto_boleta", label: "El monto de la boleta es sospechoso", correct: true },
  { id: "nombre_beneficiario", label: "El nombre del beneficiario es sospechoso", correct: true },
  { id: "fecha_emision", label: "La fecha de emisión es de 2021", correct: true },
  { id: "documentos_no_existen", label: "Este tipo de documentos no existen", correct: false },
];

export const REQUIRED_SELECTIONS = 3;

const CORRECT_IDS = new Set(
  CHALLENGE_OPTIONS.filter((option) => option.correct).map((option) => option.id)
);

export function isValidSubmission(selectedIds: string[]): boolean {
  if (selectedIds.length !== REQUIRED_SELECTIONS) return false;
  const uniqueIds = new Set(selectedIds);
  if (uniqueIds.size !== REQUIRED_SELECTIONS) return false;
  for (const id of uniqueIds) {
    if (!CORRECT_IDS.has(id)) return false;
  }
  return true;
}
