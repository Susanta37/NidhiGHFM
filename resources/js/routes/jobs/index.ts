import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\SuperAdmin\JobController::index
 * @see app/Http/Controllers/SuperAdmin/JobController.php:13
 * @route '/super-admin/jobs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/super-admin/jobs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdmin\JobController::index
 * @see app/Http/Controllers/SuperAdmin/JobController.php:13
 * @route '/super-admin/jobs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\JobController::index
 * @see app/Http/Controllers/SuperAdmin/JobController.php:13
 * @route '/super-admin/jobs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdmin\JobController::index
 * @see app/Http/Controllers/SuperAdmin/JobController.php:13
 * @route '/super-admin/jobs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\JobController::index
 * @see app/Http/Controllers/SuperAdmin/JobController.php:13
 * @route '/super-admin/jobs'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\JobController::index
 * @see app/Http/Controllers/SuperAdmin/JobController.php:13
 * @route '/super-admin/jobs'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdmin\JobController::index
 * @see app/Http/Controllers/SuperAdmin/JobController.php:13
 * @route '/super-admin/jobs'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\SuperAdmin\JobController::create
 * @see app/Http/Controllers/SuperAdmin/JobController.php:0
 * @route '/super-admin/jobs/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/super-admin/jobs/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdmin\JobController::create
 * @see app/Http/Controllers/SuperAdmin/JobController.php:0
 * @route '/super-admin/jobs/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\JobController::create
 * @see app/Http/Controllers/SuperAdmin/JobController.php:0
 * @route '/super-admin/jobs/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdmin\JobController::create
 * @see app/Http/Controllers/SuperAdmin/JobController.php:0
 * @route '/super-admin/jobs/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\JobController::create
 * @see app/Http/Controllers/SuperAdmin/JobController.php:0
 * @route '/super-admin/jobs/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\JobController::create
 * @see app/Http/Controllers/SuperAdmin/JobController.php:0
 * @route '/super-admin/jobs/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdmin\JobController::create
 * @see app/Http/Controllers/SuperAdmin/JobController.php:0
 * @route '/super-admin/jobs/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\SuperAdmin\JobController::store
 * @see app/Http/Controllers/SuperAdmin/JobController.php:39
 * @route '/super-admin/jobs'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/super-admin/jobs',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SuperAdmin\JobController::store
 * @see app/Http/Controllers/SuperAdmin/JobController.php:39
 * @route '/super-admin/jobs'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\JobController::store
 * @see app/Http/Controllers/SuperAdmin/JobController.php:39
 * @route '/super-admin/jobs'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\JobController::store
 * @see app/Http/Controllers/SuperAdmin/JobController.php:39
 * @route '/super-admin/jobs'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\JobController::store
 * @see app/Http/Controllers/SuperAdmin/JobController.php:39
 * @route '/super-admin/jobs'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\SuperAdmin\JobController::edit
 * @see app/Http/Controllers/SuperAdmin/JobController.php:0
 * @route '/super-admin/jobs/{job}/edit'
 */
export const edit = (args: { job: string | number } | [job: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/super-admin/jobs/{job}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdmin\JobController::edit
 * @see app/Http/Controllers/SuperAdmin/JobController.php:0
 * @route '/super-admin/jobs/{job}/edit'
 */
edit.url = (args: { job: string | number } | [job: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { job: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    job: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        job: args.job,
                }

    return edit.definition.url
            .replace('{job}', parsedArgs.job.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\JobController::edit
 * @see app/Http/Controllers/SuperAdmin/JobController.php:0
 * @route '/super-admin/jobs/{job}/edit'
 */
edit.get = (args: { job: string | number } | [job: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdmin\JobController::edit
 * @see app/Http/Controllers/SuperAdmin/JobController.php:0
 * @route '/super-admin/jobs/{job}/edit'
 */
edit.head = (args: { job: string | number } | [job: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\JobController::edit
 * @see app/Http/Controllers/SuperAdmin/JobController.php:0
 * @route '/super-admin/jobs/{job}/edit'
 */
    const editForm = (args: { job: string | number } | [job: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\JobController::edit
 * @see app/Http/Controllers/SuperAdmin/JobController.php:0
 * @route '/super-admin/jobs/{job}/edit'
 */
        editForm.get = (args: { job: string | number } | [job: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdmin\JobController::edit
 * @see app/Http/Controllers/SuperAdmin/JobController.php:0
 * @route '/super-admin/jobs/{job}/edit'
 */
        editForm.head = (args: { job: string | number } | [job: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\SuperAdmin\JobController::update
 * @see app/Http/Controllers/SuperAdmin/JobController.php:54
 * @route '/super-admin/jobs/{job}'
 */
export const update = (args: { job: string | number | { id: string | number } } | [job: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/super-admin/jobs/{job}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\SuperAdmin\JobController::update
 * @see app/Http/Controllers/SuperAdmin/JobController.php:54
 * @route '/super-admin/jobs/{job}'
 */
update.url = (args: { job: string | number | { id: string | number } } | [job: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { job: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { job: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    job: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        job: typeof args.job === 'object'
                ? args.job.id
                : args.job,
                }

    return update.definition.url
            .replace('{job}', parsedArgs.job.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\JobController::update
 * @see app/Http/Controllers/SuperAdmin/JobController.php:54
 * @route '/super-admin/jobs/{job}'
 */
update.put = (args: { job: string | number | { id: string | number } } | [job: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\SuperAdmin\JobController::update
 * @see app/Http/Controllers/SuperAdmin/JobController.php:54
 * @route '/super-admin/jobs/{job}'
 */
update.patch = (args: { job: string | number | { id: string | number } } | [job: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\JobController::update
 * @see app/Http/Controllers/SuperAdmin/JobController.php:54
 * @route '/super-admin/jobs/{job}'
 */
    const updateForm = (args: { job: string | number | { id: string | number } } | [job: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\JobController::update
 * @see app/Http/Controllers/SuperAdmin/JobController.php:54
 * @route '/super-admin/jobs/{job}'
 */
        updateForm.put = (args: { job: string | number | { id: string | number } } | [job: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\SuperAdmin\JobController::update
 * @see app/Http/Controllers/SuperAdmin/JobController.php:54
 * @route '/super-admin/jobs/{job}'
 */
        updateForm.patch = (args: { job: string | number | { id: string | number } } | [job: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\SuperAdmin\JobController::destroy
 * @see app/Http/Controllers/SuperAdmin/JobController.php:69
 * @route '/super-admin/jobs/{job}'
 */
export const destroy = (args: { job: string | number | { id: string | number } } | [job: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/super-admin/jobs/{job}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SuperAdmin\JobController::destroy
 * @see app/Http/Controllers/SuperAdmin/JobController.php:69
 * @route '/super-admin/jobs/{job}'
 */
destroy.url = (args: { job: string | number | { id: string | number } } | [job: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { job: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { job: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    job: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        job: typeof args.job === 'object'
                ? args.job.id
                : args.job,
                }

    return destroy.definition.url
            .replace('{job}', parsedArgs.job.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\JobController::destroy
 * @see app/Http/Controllers/SuperAdmin/JobController.php:69
 * @route '/super-admin/jobs/{job}'
 */
destroy.delete = (args: { job: string | number | { id: string | number } } | [job: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\SuperAdmin\JobController::destroy
 * @see app/Http/Controllers/SuperAdmin/JobController.php:69
 * @route '/super-admin/jobs/{job}'
 */
    const destroyForm = (args: { job: string | number | { id: string | number } } | [job: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SuperAdmin\JobController::destroy
 * @see app/Http/Controllers/SuperAdmin/JobController.php:69
 * @route '/super-admin/jobs/{job}'
 */
        destroyForm.delete = (args: { job: string | number | { id: string | number } } | [job: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const jobs = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default jobs