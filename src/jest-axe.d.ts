declare module 'jest-axe' {
  import { MatcherFunction } from 'expect';

  export interface AxeResults {
    violations: AxeViolation[];
    passes: AxeViolation[];
  }

  export interface AxeViolation {
    id: string;
    impact: string;
    tags: string[];
    description: string;
    nodes: AxeNode[];
  }

  export interface AxeNode {
    html: string;
    impact: string;
    target: string[];
    failureSummary: string;
  }

  export const matchers: {
    toHaveNoViolations(): MatcherFunction<[AxeResults]>;
  };

  export function axe(element: HTMLElement | HTMLDocument): Promise<AxeResults>;
}
