/**
 * Generated by orval v7.8.0 🍺
 * Do not edit manually.
 * Rennan API
 * The Rennan API
 * OpenAPI spec version: 1.0.0
 */
import type { ResponseAccountEventDTOType } from './responseAccountEventDTOType'

export interface ResponseAccountEventDTO {
  /** Account id of the AccountEvent */
  account_id: string
  /** Type of the AccountEvent */
  type?: ResponseAccountEventDTOType
  /** Description of the AccountEvent */
  description?: string
  /** AccountEvent id */
  id: number
  /** Date of creation */
  created_at: string
  /** Date of last update */
  updated_at: string
  /** Date of deletion */
  deleted_at: string
}
