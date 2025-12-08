import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
 * @see routes/web.php:63
 * @route '/onboarding'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/onboarding',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:63
 * @route '/onboarding'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:63
 * @route '/onboarding'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:63
 * @route '/onboarding'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:63
 * @route '/onboarding'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:63
 * @route '/onboarding'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:63
 * @route '/onboarding'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\OnboardingController::skip
 * @see app/Http/Controllers/OnboardingController.php:9
 * @route '/onboarding/skip'
 */
export const skip = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: skip.url(options),
    method: 'post',
})

skip.definition = {
    methods: ["post"],
    url: '/onboarding/skip',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\OnboardingController::skip
 * @see app/Http/Controllers/OnboardingController.php:9
 * @route '/onboarding/skip'
 */
skip.url = (options?: RouteQueryOptions) => {
    return skip.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OnboardingController::skip
 * @see app/Http/Controllers/OnboardingController.php:9
 * @route '/onboarding/skip'
 */
skip.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: skip.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\OnboardingController::skip
 * @see app/Http/Controllers/OnboardingController.php:9
 * @route '/onboarding/skip'
 */
    const skipForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: skip.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\OnboardingController::skip
 * @see app/Http/Controllers/OnboardingController.php:9
 * @route '/onboarding/skip'
 */
        skipForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: skip.url(options),
            method: 'post',
        })
    
    skip.form = skipForm
const onboarding = {
    show: Object.assign(show, show),
skip: Object.assign(skip, skip),
}

export default onboarding