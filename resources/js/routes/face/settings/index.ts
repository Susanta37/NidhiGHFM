import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SuperAdmin\FaceRecognitionController::save
 * @see app/Http/Controllers/SuperAdmin/FaceRecognitionController.php:83
 * @route '/super-admin/face/settings/save'
 */
export const save = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: save.url(options),
    method: 'post',
})

save.definition = {
    methods: ["post"],
    url: '/super-admin/face/settings/save',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SuperAdmin\FaceRecognitionController::save
 * @see app/Http/Controllers/SuperAdmin/FaceRecognitionController.php:83
 * @route '/super-admin/face/settings/save'
 */
save.url = (options?: RouteQueryOptions) => {
    return save.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\FaceRecognitionController::save
 * @see app/Http/Controllers/SuperAdmin/FaceRecognitionController.php:83
 * @route '/super-admin/face/settings/save'
 */
save.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: save.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\FaceRecognitionController::save
 * @see app/Http/Controllers/SuperAdmin/FaceRecognitionController.php:83
 * @route '/super-admin/face/settings/save'
 */
    const saveForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: save.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\FaceRecognitionController::save
 * @see app/Http/Controllers/SuperAdmin/FaceRecognitionController.php:83
 * @route '/super-admin/face/settings/save'
 */
        saveForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: save.url(options),
            method: 'post',
        })
    
    save.form = saveForm
const settings = {
    save: Object.assign(save, save),
}

export default settings