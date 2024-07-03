import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponseFormatDto } from '../dtos/response-format.dto';
import { ErrorFormatDto } from '../dtos/error-format.dto';

/**
 *
 * @param summary Api 설명
 * @returns
 */
export const SwaagerApiOperation = (summary: string) => {
  return ApiOperation({ summary });
};

/**
 *
 * @param status 해당 응답 코드값
 * @param description 해당 응답 설명
 * @param dto 해당 응답 JSON 구조
 * @returns
 */
export const SwaagerApiOkResponse = (
  status: number,
  description: string,
  dto?: Type<any>,
) => {
  if (dto) {
    return applyDecorators(
      ApiExtraModels(ResponseFormatDto, dto),
      ApiResponse({
        status,
        description,
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseFormatDto) },
            {
              properties: {
                data: {
                  $ref: getSchemaPath(dto),
                },
              },
            },
          ],
        },
      }),
    );
  } else {
    return ApiResponse({ status, description });
  }
  // if (dto) {
  //   return applyDecorators(
  //     ApiExtraModels(dto),
  //     ApiResponse({
  //       status,
  //       description,
  //       schema: {
  //         type: 'object',
  //         properties: {
  //           statusCode: {
  //             type: 'number',
  //             example: status,
  //             description: '해당 HTTP 코드',
  //           },
  //           isLogin: {
  //             type: 'boolean',
  //             example: false,
  //             description: '로그인 유무',
  //           },
  //           data: { $ref: getSchemaPath(dto) },
  //         },
  //       },
  //     }),
  //   );
  // } else {
  //   return ApiResponse({ status, description });
  // }
};

/**
 *
 * @param status 해당 응답 코드값
 * @param description 해당 응답 설명
 * @returns
 */
export const SwaagerApiErrorResponse = (status: number, description: string) =>
  ApiResponse({
    status,
    description,
    type: ErrorFormatDto,
    // schema: {
    //   type: 'object',
    //   properties: {
    //     statusCode: {
    //       type: 'number',
    //       example: status,
    //       description: '해당 HTTP 코드',
    //     },
    //     error: {
    //       type: 'string',
    //       example: 'Bad Request',
    //       description: '에러발생시 해당 에러종류',
    //     },
    //     message: {
    //       type: 'string',
    //       example: '서버에서 에러가 발생하였습니다.',
    //       description: '에러발생시 해당 에러관련 메세지',
    //     },
    //   },
    // },
  });

/**
 *
 * @param name Query 이름
 * @param type Query 타입
 * @param description Query 설명
 * @param required Query 필요 유무
 * @returns
 */
export const SwaagerApiQuery = (
  name: string,
  type: Type,
  description: string,
  required: boolean = true,
) => {
  return ApiQuery({ name, required, description, type });
};

/**
 *
 * @param name Query 이름
 * @param type Query 타입
 * @param description Query 설명
 * @param required Query 필요 유무
 * @returns
 */
export const SwaagerApiBody = (
  type: Type<any>,
  description: string,
  required: boolean = true,
) => {
  return ApiBody({ required, description, type });
};
