// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** doLogin GET /api/satoken/doLogin */
export async function doLoginUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.doLoginUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/satoken/doLogin', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** doLogin PUT /api/satoken/doLogin */
export async function doLoginUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.doLoginUsingPUTParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/satoken/doLogin', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** doLogin POST /api/satoken/doLogin */
export async function doLoginUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.doLoginUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/satoken/doLogin', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** doLogin DELETE /api/satoken/doLogin */
export async function doLoginUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.doLoginUsingDELETEParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/satoken/doLogin', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** doLogin PATCH /api/satoken/doLogin */
export async function doLoginUsingPatch(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.doLoginUsingPATCHParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/satoken/doLogin', {
    method: 'PATCH',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** isLogin GET /api/satoken/isLogin */
export async function isLoginUsingGet(options?: { [key: string]: any }) {
  return request<string>('/api/satoken/isLogin', {
    method: 'GET',
    ...(options || {}),
  });
}

/** isLogin PUT /api/satoken/isLogin */
export async function isLoginUsingPut(options?: { [key: string]: any }) {
  return request<string>('/api/satoken/isLogin', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** isLogin POST /api/satoken/isLogin */
export async function isLoginUsingPost(options?: { [key: string]: any }) {
  return request<string>('/api/satoken/isLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** isLogin DELETE /api/satoken/isLogin */
export async function isLoginUsingDelete(options?: { [key: string]: any }) {
  return request<string>('/api/satoken/isLogin', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** isLogin PATCH /api/satoken/isLogin */
export async function isLoginUsingPatch(options?: { [key: string]: any }) {
  return request<string>('/api/satoken/isLogin', {
    method: 'PATCH',
    ...(options || {}),
  });
}
