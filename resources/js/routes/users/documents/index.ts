import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SuperAdmin\UserManagementController::upload
 * @see app/Http/Controllers/SuperAdmin/UserManagementController.php:207
 * @route '/super-admin/users/{user}/documents'
 */
export const upload = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(args, options),
    method: 'post',
})

upload.definition = {
    methods: ["post"],
    url: '/super-admin/users/{user}/documents',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SuperAdmin\UserManagementController::upload
 * @see app/Http/Controllers/SuperAdmin/UserManagementController.php:207
 * @route '/super-admin/users/{user}/documents'
 */
upload.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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
* @see \App\Http\Controllers\SuperAdmin\UserManagementController::upload
 * @see app/Http/Controllers/SuperAdmin/UserManagementController.php:207
 * @route '/super-admin/users/{user}/documents'
 */
upload.post = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\UserManagementController::upload
 * @see app/Http/Controllers/SuperAdmin/UserManagementController.php:207
 * @route '/super-admin/users/{user}/documents'
 */
    const uploadForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: upload.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\UserManagementController::upload
 * @see app/Http/Controllers/SuperAdmin/UserManagementController.php:207
 * @route '/super-admin/users/{user}/documents'
 */
        uploadForm.post = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: upload.url(args, options),
            method: 'post',
        })
    
    upload.form = uploadForm
const documents = {
    upload: Object.assign(upload, upload),
}

export default documents