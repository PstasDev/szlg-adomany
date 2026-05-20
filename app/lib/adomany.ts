import type {
  DonationCreatePayload,
  DonationCreateResponse,
  DonationStatus,
  ProjectDetail,
  ProjectListItem,
} from './adomany-types';

const API_BASE = (
  process.env.NEXT_PUBLIC_ADOMANY_API_BASE ||
  'https://ws.szlg.info/adomany/api'
).replace(/\/$/, '');

async function request<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  });
  if (!res.ok) {
    let detail: unknown;
    try {
      detail = await res.json();
    } catch {
      detail = await res.text();
    }
    const err = new Error(
      `Adomány API hiba: ${res.status} ${res.statusText}`,
    ) as Error & { status: number; detail: unknown };
    err.status = res.status;
    err.detail = detail;
    throw err;
  }
  return res.json() as Promise<T>;
}

export async function listProjects(params?: {
  tagozat?: string;
  szak?: string;
}): Promise<ProjectListItem[]> {
  const search = new URLSearchParams();
  if (params?.tagozat) search.set('tagozat', params.tagozat);
  if (params?.szak) search.set('szak', params.szak);
  const qs = search.toString();
  return request<ProjectListItem[]>(`/projects/${qs ? `?${qs}` : ''}`);
}

export async function getProject(slug: string): Promise<ProjectDetail> {
  return request<ProjectDetail>(`/projects/${encodeURIComponent(slug)}/`);
}

export async function createDonation(
  payload: DonationCreatePayload,
): Promise<DonationCreateResponse> {
  return request<DonationCreateResponse>('/donate/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getDonationStatus(
  sessionId: string,
): Promise<DonationStatus> {
  return request<DonationStatus>(
    `/donations/${encodeURIComponent(sessionId)}/status/`,
  );
}

export function formatHuf(amount: number): string {
  return new Intl.NumberFormat('hu-HU').format(amount) + ' Ft';
}
