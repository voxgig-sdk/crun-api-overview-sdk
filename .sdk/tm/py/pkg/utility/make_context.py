# CrunApiOverview SDK utility: make_context

from projectname_sdk.core.context import CrunApiOverviewContext


def make_context_util(ctxmap, basectx):
    return CrunApiOverviewContext(ctxmap, basectx)
