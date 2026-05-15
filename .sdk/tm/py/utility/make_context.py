# CrunApiOverview SDK utility: make_context

from core.context import CrunApiOverviewContext


def make_context_util(ctxmap, basectx):
    return CrunApiOverviewContext(ctxmap, basectx)
