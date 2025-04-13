/**
 * Generated by orval v7.8.0 🍺
 * Do not edit manually.
 * Rennan API
 * The Rennan API
 * OpenAPI spec version: 1.0.0
 */

export type CommentControllerGetAllParams = {
  /**
   * Post id of the Comment
   */
  post_id?: number
  /**
   * Content of the Comment
   */
  content?: string
  /**
   * Account id of the Comment
   */
  account_id?: string
  /**
   * Sort by Comment created_at
   */
  sort_by_created_at?: string
  /**
   * Sort by Comment updated_at
   */
  sort_by_updated_at?: string
  offset?: number
  page?: number
}
