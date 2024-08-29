export interface Note {
  id: string;
  content: string;
  pov_type: string | null;
  narrator_trustworthiness: string | null;
  epistemic_anomalies: string | null;
  narration_nodes: Array<{
    element: string;
    description: string;
  }> | null;
  tags: string[];
  sequence_position: number | null;
  source: string | null;
  created_at: string;
  updated_at: string;
}