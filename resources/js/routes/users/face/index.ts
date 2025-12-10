import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SuperAdmin\FaceRecognitionController::register
 * @see app/Http/Controllers/SuperAdmin/FaceRecognitionController.php:27
 * @route '/super-admin/users/{user}/face-register'
 */
export const register = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(args, options),
    method: 'post',
})

register.definition = {
    methods: ["post"],
    url: '/super-admin/users/{user}/face-register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SuperAdmin\FaceRecognitionController::register
 * @see app/Http/Controllers/SuperAdmin/FaceRecognitionController.php:27
 * @route '/super-admin/users/{user}/face-register'
 */
register.url = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return register.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\FaceRecognitionController::register
 * @see app/Http/Controllers/SuperAdmin/FaceRecognitionController.php:27
 * @route '/super-admin/users/{user}/face-register'
 */
register.post = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\FaceRecognitionController::register
 * @see app/Http/Controllers/SuperAdmin/FaceRecognitionController.php:27
 * @route '/super-admin/users/{user}/face-register'
 */
    const registerForm = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: register.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\FaceRecognitionController::register
 * @see app/Http/Controllers/SuperAdmin/FaceRecognitionController.php:27
 * @route '/super-admin/users/{user}/face-register'
 */
        registerForm.post = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: register.url(args, options),
            method: 'post',
        })
    
    register.form = registerForm
const face = {
    register: Object.assign(register, register),
}

export default face