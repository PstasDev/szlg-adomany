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
  const url = `${API_BASE}${path}`;
  let res: Response;
  try {
    res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      },
      ...init,
    });
  } catch (e) {
    // undici "fetch failed" hides the real reason in `cause`. Surface it.
    const cause = (e as { cause?: { code?: string; message?: string } }).cause;
    const reason =
      cause?.code || cause?.message || (e as Error).message || 'unknown';
    throw new Error(`Adomány API elérhetetlen (${url}): ${reason}`);
  }
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
  paymentId: string,
): Promise<DonationStatus> {
  return request<DonationStatus>(
    `/donations/${encodeURIComponent(paymentId)}/status/`,
  );
}

export async function cancelDonation(
  paymentId: string,
): Promise<DonationStatus> {
  return request<DonationStatus>(
    `/donations/${encodeURIComponent(paymentId)}/cancel/`,
    { method: 'POST' },
  );
}

export function formatHuf(amount: number): string {
  return new Intl.NumberFormat('hu-HU').format(amount) + ' Ft';
}
