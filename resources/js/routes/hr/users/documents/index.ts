import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\HR\HRUserManagementController::upload
 * @see app/Http/Controllers/HR/HRUserManagementController.php:202
 * @route '/hr/users/{user}/documents'
 */
export const upload = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(args, options),
    method: 'post',
})

upload.definition = {
    methods: ["post"],
    url: '/hr/users/{user}/documents',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HR\HRUserManagementController::upload
 * @see app/Http/Controllers/HR/HRUserManagementController.php:202
 * @route '/hr/users/{user}/documents'
 */
upload.url = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return upload.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HR\HRUserManagementController::upload
 * @see app/Http/Controllers/HR/HRUserManagementController.php:202
 * @route '/hr/users/{user}/documents'
 */
upload.post = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HR\HRUserManagementController::upload
 * @see app/Http/Controllers/HR/HRUserManagementController.php:202
 * @route '/hr/users/{user}/documents'
 */
    const uploadForm = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: upload.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HR\HRUserManagementController::upload
 * @see app/Http/Controllers/HR/HRUserManagementController.php:202
 * @route '/hr/users/{user}/documents'
 */
        uploadForm.post = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: upload.url(args, options),
            method: 'post',
        })
    
    upload.form = uploadForm
const documents = {
    upload: Object.assign(upload, upload),
}

export default documents