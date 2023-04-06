<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class StoreUser extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'unique:users,email|email|required',
            'name' =>  'required',
            'password' => 'required'
        ];
    }

    public function messages(): array
    {
        return [
            'email.unique' => 'O email já está em uso',
            'email.email' => 'O email não é válido',
            'email.required' => 'O email é obrigatório',
            'name.required' => 'O nome é obrigatório',
            'password.required' => 'A senha é obrigatória'
        ];
    }
}
