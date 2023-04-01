<?php

namespace App\Services;

class ResponseService
{
    /**
   * Default Responses.
   *
   * @return void
   */
    public static function default($config = array(), $id = null)
    {
        $route = $config['route'];

        switch($config['type']) {
            case 'store':
                return [
                    'status' => true,
                    'message' => 'Cadastro realizado com sucesso',
                    'url' => route($route)
                ];

                break;
            case 'show':
                return [
                    'status' => true,
                    'message' => 'Busca realizada com sucesso',
                    'url' => $id != null ? route($route, $id) : route($route)
                ];

                break;
            case 'update':
                return [
                    'status' => true,
                    'message' => 'Atualizado com sucesso',
                    'url' => $id != null ? route($route, $id) : route($route)
                ];

                break;
            case 'destroy':
                return [
                    'status' => true,
                    'message' => 'Dado removido com sucesso',
                    'url' => $id != null ? route($route, $id) : route($route)
                ];

                break;
        }
    }

    /**
     * Register services.
     *
     * @return void
    */
    public static function exception($route, $id = null, $e)
    {
        switch($e->getCode()) {
            case -403:
                return response()->json([
                    'status' => false,
                    'statusCode' => 403,
                    'error' => $e->getMessage(),
                    'url' => $id != null ? route($route, $id) : route($route)
                ], 403);

                break;
            case -404:
                return response()->json([
                    'status' => false,
                    'statusCode' => 404,
                    'error' => $e->getMessage(),
                    'url' => $id != null ? route($route, $id) : route($route)
                ], 404);

                break;
            default:
                if(app()->bound('destroy')) {
                    $sentry = app('sentry');
                    $user = auth()->user();

                    if($user) {
                        $sentry->user_context(['id' => $user->id, 'name' => $user->name]);
                    }

                    $sentry->captureException($e);
                }

                return response()->json([
                    'status' => false,
                    'statusCode' => 500,
                    'error' => 'Ocorreu um erro inesperado',
                    'url' => $id != null ? route($route, $id) : route($route)
                ], 500);

                break;
        }
    }
}