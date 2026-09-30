import path from 'node:path';

/**
 * Resolve the path of a label or manifest asset a client asked for.
 *
 * `root` is the directory assets are served from and `requestPath` is the
 * client-supplied remainder of the URL. The returned path is what the caller
 * will read from disk.
 */
export function resolveAsset(root, requestPath) {
  return path.join(root, requestPath);
}

/**
 * Read-side companion to {@link resolveAsset}: true when a resolved path is one
 * the server is willing to serve.
 */
export function isServableAsset(resolved) {
  return resolved.endsWith('.pdf') || resolved.endsWith('.json');
}
